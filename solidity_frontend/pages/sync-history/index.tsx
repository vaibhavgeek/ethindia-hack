import { Box, Button, Container, Heading } from "@chakra-ui/react";
import React from "react";

import { Web3Storage } from "web3.storage";

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function makeFileObject() {
  const browsingVectors = [[new Date()], [1, 2, 3], [3, 2, 1]];
  const blob = new Blob([JSON.stringify(browsingVectors)], {
    type: "application/json",
  });

  return [new File([blob], "browsing-vectors.json")];
}

async function storeFiles(file: File[]) {
  //create a new file in web3.storage
  const client = makeStorageClient();
  const cid = await client.put(file);
  console.log("stored files with cid:", cid);
  localStorage.setItem("history-vector-cid", cid);
  return cid;
}

export default function SyncHistoryPage() {
  return (
    <Container mt={4}>
      <Heading>Sync Browser History Page</Heading>

      <Box>
        <Button onClick={() => storeFiles(makeFileObject())}>
          Sync History
        </Button>
      </Box>
    </Container>
  );
}
