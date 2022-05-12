const <%= name %>Service = require('./<%= nameLower %>.service');

const <%= name %>Controller = {
  getResource: async (httpRequest) => {
    const resource = await <%= name %>Service.doGetResource(httpRequest);
    return {
      statusCode: 200,
      data: resource
    };
  }
};

module.exports = <%= name %>Controller;
