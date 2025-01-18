import { createClient } from "next-sanity";

const client = createClient({
    projectId: '2fyzkdcl',
    dataset:'production',
    useCdn: true,
    apiVersion: '2023-01-01'
})

export async function sanityFetch({query,params = {}}:{query:string,params?:any}) {
    return await client.fetch(query, params)
}