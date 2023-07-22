
import { KGraph } from '@/components/kgraph'

export interface KGraphPageProps {
  params: {
    id: string
  }
}

export default async function KGraphPage({ params }: KGraphPageProps) {
  return <KGraph />
}
