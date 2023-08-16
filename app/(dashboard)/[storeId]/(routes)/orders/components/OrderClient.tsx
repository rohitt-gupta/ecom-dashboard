"use client"

import Heading from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading title={`Orders (${data.length})`} description='Manage orders for your store' />
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />

    </>

  )
}

export default OrderClient