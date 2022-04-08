import React from 'react'

export const ConvertBytesToFile = (type, bytes) => {
  return 'data:'+type+';base64,'+bytes;
}

