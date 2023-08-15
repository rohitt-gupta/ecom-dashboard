"use client"

import Heading from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Colors(${data.length})`} description='Manage colors for your store' />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for Colors' />
      <Separator />
      <ApiList entityIdName='colorId' entityName='colors' />
    </>

  )
}

export default ColorClient