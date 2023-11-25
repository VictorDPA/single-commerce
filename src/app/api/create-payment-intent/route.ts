import { log } from "console";
import { stripe } from "@lib/stripe";
import { auth } from "@clerk/nextjs";
import { ProductType } from "@/types/ProductType";
import { newProductDataMap, totalPriceForCheckout } from "@/lib/utils";
import prisma from "@/lib/prisma";

const calculateOrderAmount = (items: ProductType[]) =>
  totalPriceForCheckout(items);

export async function POST(req: Request) {
  const { userId } = auth();
  const { items, payment_intent_id } = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const customerIdTemp = "cus_P4ZhE6NHO9v53A";
  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: 1 } },
    amount: total,
    currency: "brl",
    status: "pending",
    paymentIntentId: payment_intent_id,
    products: {
      create: newProductDataMap(items),
    },
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id,
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total },
      );

      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentID: payment_intent_id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { paymentIntentID: payment_intent_id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: newProductDataMap(items),
            },
          },
          include: { products: true },
        }),
      ]);

      if (!existing_order) {
        return new Response("Order not found", { status: 404 });
      }

      return Response.json({ paymentIntent: updated_intent }, { status: 200 });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "brl",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({ data: orderData }); // Create new order

    return Response.json({ paymentIntent }, { status: 200 });
  }
}
