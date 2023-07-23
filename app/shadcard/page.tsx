import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { CardDemo } from '@/components/card-kgraph'
export interface KGraphPageProps {
  params: {
    id: string
  }
}

export default async function KGraphPage({ params }: KGraphPageProps) {
  return <CardDemo />
}
