import { DemoNotice } from "@/components/site/page-elements";
import { CheckoutView } from "@/components/commerce/checkout-view";
export const metadata = { title: "Checkout" };
export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) { const query = await searchParams; return <><DemoNotice>Safe demo checkout · no real payment, email, tax, shipping, or fulfillment action occurs</DemoNotice><CheckoutView plan={query.plan}/></>; }
