from qdrant_client import QdrantClient
from fastapi import FastAPI


class HybridSearcher:
    DENSE_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
    SPARSE_MODEL = "prithivida/Splade_PP_en_v1"

    def __init__(self, collection_name):
        self.collection_name = collection_name
        self.qdrant_client = QdrantClient("http://saffron:6333")
        self.qdrant_client.set_model(self.DENSE_MODEL)
        self.qdrant_client.set_sparse_model(self.SPARSE_MODEL)

    def search(self, text: str):
        search_result = self.qdrant_client.query(
            collection_name=self.collection_name,
            query_text=text,
            query_filter=None,
            limit=5,
        )

        metadata = [hit.metadata for hit in search_result]
        return metadata


app = FastAPI()

# Create a neural searcher instance
hybrid_searcher = HybridSearcher(collection_name="archive")


@app.get("/api/search")
def search_startup(q: str):
    return {"result": hybrid_searcher.search(text=q)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
