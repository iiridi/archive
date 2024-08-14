from fastembed import TextEmbedding
from pathlib import Path
from qdrant_client import QdrantClient
from tqdm import tqdm

import yaml


client = QdrantClient(url="http://saffron:6333")

client.set_model("sentence-transformers/all-MiniLM-L6-v2")
client.set_sparse_model("prithivida/Splade_PP_en_v1")

# encoder = client.get_fastembed_vector_params()

client.recreate_collection(
    collection_name="archive",
    vectors_config=client.get_fastembed_vector_params(),
    sparse_vectors_config=client.get_fastembed_sparse_vector_params(),
)

documents = []
metadata = []

origins = ["Althane", "Astra", "Faerrin", "Syrin", "Urth", "Ushas"]

path = r"C:\Users\jbassin\pf2e\campaign-2\content"
md_files = Path(path).glob("**/*.md")
for file in md_files:
    contents = file.read_text(encoding="utf-8")

    origin = "Astra"
    for o in origins:
        if file.resolve().as_posix().find(o) != -1:
            origin = o
            break

    splt = contents.split("---")
    if len(splt) > 1:
        frontmatter = splt[1]
        data = yaml.full_load(frontmatter)
        data["origin"] = origin

        contents = "---".join(splt[2:])

        documents.append(contents)
        metadata.append(data)
    else:
        documents.append(contents)
        metadata.append({"title": file.stem, "origin": origin})

client.add(
    collection_name="archive",
    documents=documents,
    metadata=metadata,
    ids=tqdm(range(len(documents))),
)
