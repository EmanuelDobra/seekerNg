export interface PdfQuestion {
    question: string;
    pdf: string;
}

export interface RagQuestion {
    question: string
    rag_type: string
    context: string
    file_name: string
}
