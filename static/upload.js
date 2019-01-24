function beforeAvatarUpload(file) {
  const suffix = file.name.split('.')[1];
  const isJPEG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isJPG = file.type === 'image/jpg';
  const isBMP = file.type === 'image/bmp';
  const isGIF = file.type === 'image/gif';
  const extension = suffix === 'xls';
  const extension2 = suffix === 'xlsx';
  const extension3 = suffix === 'doc';
  const extension4 = suffix === 'docx';
  const extension5 = suffix === 'txt';
  const extension6 = suffix === 'ppt';
  const extension7 = suffix === 'html';
  const extension8 = suffix === 'htm';
  const extension9 = suffix === 'zip';
  const cxtension2 = suffix === 'rar';
  const cxtension3 = suffix === 'gz';
  const cxtension4 = suffix === 'bz2';
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isJPEG && !isPNG && !isJPG && !isBMP && !isGIF && !extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 &&
    !extension7 && !extension8 && !extension9 && !cxtension2 && !cxtension3 && !cxtension4) {
    this.$message.error('上传文件格式有误!');
  }
  if (!isLt2M) {
    this.$message.error('上传文件大小不能超过10MB!');
  };
  return ((isJPEG || isPNG || isGIF || isBMP || isJPG || extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 || extension8 || extension9 || cxtension2 || cxtension3 || cxtension4) && isLt2M);
}

