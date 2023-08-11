// inside this we are going to built 2 routes/ API
/**
 * 1st PATCH route to update the store when we click on SAVE CHANGES in [storeId]/settings
 * 2nd is going to be a delete button which we will use to delete the button
 */

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) { return new NextResponse("Unauthenticateed", { status: 401 }) };

    if (!name) { return new NextResponse("Name is Required", { status: 400 }) };

    if (!params.storeId) { return new NextResponse("Store id is required", { status: 401 }) };

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) { return new NextResponse("Unauthenticateed", { status: 401 }) };

    if (!params.storeId) { return new NextResponse("Store id is required", { status: 401 }) };

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      }
    });

    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}