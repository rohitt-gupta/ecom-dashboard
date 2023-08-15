import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) { return new NextResponse("Category id is required", { status: 401 }) };

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);

  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) { return new NextResponse("Unauthenticateed", { status: 401 }) };

    if (!name) { return new NextResponse("Name is Required", { status: 400 }) };

    if (!billboardId) { return new NextResponse("Billboard id  is Required", { status: 400 }) };

    if (!params.categoryId) { return new NextResponse("Category id is required", { status: 401 }) };

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      data: {
        name,
        billboardId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(category);

  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) { return new NextResponse("Unauthenticateed", { status: 401 }) };

    if (!params.categoryId) { return new NextResponse("Category id is required", { status: 401 }) };


    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);

  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}