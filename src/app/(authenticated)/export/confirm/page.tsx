"use client";

import { Box } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import Paper from "~/components/pages/export-pdf/confirm/paper";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { TAdjacentDocuments, TDocument } from "~/utils/validators";

export default function ExportConfirmPage() {
  const searchParams = useSearchParams();
  const queriedDocumentId = searchParams.get("documentId") ?? "";

  const { data: document, isLoading: isLoadingDocument } = useQuery<TDocument>({
    queryKey: [`/documents/${queriedDocumentId}`],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!queriedDocumentId,
  });

  const { data: adjacentDocuments } = useQuery<TAdjacentDocuments>({
    queryKey: [
      `/documents/adjacent?&b_id=${document?.Bautismo.b_id ?? ""}&c_id=&m_id=&p_id=${document?.parent_Data.p_id ?? ""}`,
    ],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!document,
  });
  return (
    <Box marginLeft="18vw" h="100vh" style={{ display: "block" }}>
      {!isLoadingDocument && (
        <PDFViewer width="100%" height="100%">
          <Paper document={document} adjacentDocuments={adjacentDocuments} />
        </PDFViewer>
      )}
    </Box>
  );
}
