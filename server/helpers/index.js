
export const responseFn = (data , code) => ({
  statusCode: code ? code : 200,
  data: data ? data : {},
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
  },
})

export const stringToNumber =  ({nunPage, pageSize}) => {
  const page = parseInt(nunPage)
  const limit = parseInt(pageSize)

  return {
    page,
    limit
  }
}

export const getTotalPages = (totalRows, limit) => {
  return Math.ceil(totalRows / limit);
}

export const getOffSet = (page, limit) => {
  return (page - 1) * limit;
}