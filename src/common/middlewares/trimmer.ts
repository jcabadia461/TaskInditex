const trimStringProperties = (obj) => {
  if (obj !== null && typeof obj === 'object') {
    for (const prop in obj) {
      if (typeof obj[prop] === 'object') {
        return trimStringProperties(obj[prop]);
      }

      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].trim();
      }
    }
  }
};

const trimmer = (req, res, next) => {
  if (req.params) {
    trimStringProperties(req.body);
  }

  if (req.query) {
    trimStringProperties(req.query);
  }

  if (req.body) {
    trimStringProperties(req.query);
  }

  next();
};

export { trimmer };
