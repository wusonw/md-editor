/**
 * 根据文件url获取文件内容
 */
export const getContentFromFileUrl = async (
  url: string,
  callback?: (val: string) => void
) => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch {
    return null;
  }
};
