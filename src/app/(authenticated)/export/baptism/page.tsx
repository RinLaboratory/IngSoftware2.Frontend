"use client";

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import Paper from "~/components/pages/export-pdf/baptism/paper";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { TAdjacentDocuments, TDocument } from "~/utils/validators";

export default function ExportBaptismPage() {
  const searchParams = useSearchParams();
  const queriedDocumentId = searchParams.get("documentId") ?? "";

  const { data } = useQuery<{
    documents: TDocument[];
  }>({
    queryKey: [
      `/getdocument?&search=${queriedDocumentId}&selectValue=exportPackage`,
    ],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const document = useMemo(() => {
    return data?.documents[0] ?? undefined;
  }, [data]);

  const { data: adjacentDocuments } = useQuery<TAdjacentDocuments>({
    queryKey: [
      `/getadjacentdocuments?&b_id=${document?.Bautismo.b_id ?? ""}&c_id=&m_id=&p_id=${document?.parent_Data.p_id ?? ""}`,
    ],
    staleTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!document,
  });

  return (
    <Box
      marginLeft="18vw"
      h="100vh"
      style={{ display: document ? "block" : "none" }}
    >
      <PDFViewer width="100%" height="100%">
        <Paper document={document} adjacentDocuments={adjacentDocuments} />
      </PDFViewer>
    </Box>
  );
}
