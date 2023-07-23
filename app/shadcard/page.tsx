import { CardDemo } from '@/components/card-kgraph'
export interface KGraphPageProps {
  params: {
    id: string
  }
}

export default async function KGraphPage({ params }: KGraphPageProps) {
  return <CardDemo />
}
