import React from 'react'
import { format } from 'date-fns'
import BillboardClient from './components/OrderClient'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/Columns'
import { formatter } from '@/lib/utils'
import OrderClient from './components/OrderClient'

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrder: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(','),
    totalPrice: formatter.format(item.orderItems.reduceRight((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  )
}

export default OrdersPage