export type UploaderProps = {
    reportValidity: (id: number, value: boolean) => void;
    onParameterChange: (parameters: UploadSongDtoBase) => void;
};

export type UploadSongDtoBase = {
    title: string;
    source: string;
};
