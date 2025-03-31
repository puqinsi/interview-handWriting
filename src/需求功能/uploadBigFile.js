/* 计算唯一标识 hash */
async function calculateFileHash(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async e => {
      const buffer = e.target.result;
      const hash = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
      resolve(hashHex);
    };
  });
}

/* 查询上传状态 */
async function checkUploadStatus(filename, fileHash, totalChunks) {
  const response = await axios.get("/upload-status", {
    params: { filename, fileHash, totalChunks }
  });
  return response.data.uploadedChunks; // 返回已上传的分片索引
}

/* 文件分片 */
function createChunks(file, chunkSize = 2 * 1024 * 1024) {
  const chunks = [];
  let start = 0;
  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);
    start = end;
  }
  return chunks;
}

/* 上传控制 */
async function uploadChunks(chunks, fileHash) {
  const requests = chunks.map((chunk, index) => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("hash", `${fileHash}-${index}`);
    formData.append("filename", file.name);
    formData.append("total", chunks.length);
    return axios.post("/upload", formData);
  });

  // 控制并发数量
  await Promise.all(requests);
}
