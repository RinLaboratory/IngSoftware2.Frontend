import React from "react";

import { Page, Document, View } from "@react-pdf/renderer";

import Header from "./components/header/header";
import type { TAdjacentDocuments, TDocument } from "~/utils/validators";
import BodyWithoutData from "./components/body/without-data/body";
import BodyWithData from "./components/body/with-data/body";

interface PaperProps {
  document: TDocument | undefined;
  adjacentDocuments: TAdjacentDocuments | undefined;
}

export default function Paper({ document, adjacentDocuments }: PaperProps) {
  return (
    <Document>
      <Page size="LEGAL">
        <View style={{ flexDirection: "row", height: "1008px" }}>
          <View style={{ flexDirection: "column" }}>
            <Header />
            {!document || !adjacentDocuments ? (
              <BodyWithoutData />
            ) : (
              <BodyWithData
                document={document}
                adjacentDocuments={adjacentDocuments}
              />
            )}
          </View>
          <View
            style={{
              paddingRight: "10%",
              width: "1%",
              height: "100%",
              backgroundColor: "white",
            }}
          />
        </View>
      </Page>
    </Document>
  );
}
