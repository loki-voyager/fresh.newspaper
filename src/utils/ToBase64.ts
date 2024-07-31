export const convertFilesToBase64Array = async (
    files: FileList | null
): Promise<string[]> => {
    const base64Array: string[] = [];

    if (files && files.length > 0) {
        const fileList = Array.from(files);

        const readAndPushBase64 = async (file: File) => {
            return new Promise<void>((resolve) => {
                const fileReader = new FileReader();

                fileReader.onload = () => {
                    const base64Data = fileReader.result as string;
                    base64Array.push(base64Data.split(",")[1]);
                    resolve();
                };

                fileReader.readAsDataURL(file);
            });
        };

        await Promise.all(fileList.map(readAndPushBase64));
    }

    return base64Array;
};
