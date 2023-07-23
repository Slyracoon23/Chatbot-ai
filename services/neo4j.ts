'use client';
import { createDriver } from 'use-neo4j'

const driver = createDriver(
  'neo4j+s',
  '008a57cc.databases.neo4j.io',
  7687,
  'neo4j',
  'r5a9crFqtc0kqnioMrMcNZyZyIJ4plwmizIK8Hl-zUg'
)

// export interface NodeProps {
//   id: number;
//   name: string;
//   skills: string;
//   email: string;
// }

export async function createNode(labels: string, props: any) {
  const session = driver.session();

  try {
    const result = await session.run(
      `CREATE (a:${labels} $props) RETURN a`,
      {props}
    );

    return result.records[0].get('a').properties;
    
  } finally {
    await session.close();
  }
}