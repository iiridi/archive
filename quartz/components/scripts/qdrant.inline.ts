import { QdrantClient } from '@qdrant/js-client-rest';

let client: QdrantClient | null = null;
function setupClient() {
    client = new QdrantClient({ url: 'http://saffron:6333' });
}

async function getCollections() {
    const result = await client!.getCollections();
    console.log('List of collections:', result.collections);
}

// document.addEventListener("nav",  (t: Document, ev: CustomEvent<{ url: FullSlug; }>): void => {
//   setupClient()

//    getCollections();
// })

// (this: Document, ev: CustomEvent<{ url: FullSlug; }>) => void
// (this: Document, ev: CustomEvent<{ url: FullSlug; }>) => void