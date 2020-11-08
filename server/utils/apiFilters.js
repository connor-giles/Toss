// ======================================= Description ============================================ //
//
//
// This Class allows one to apply filters to http request queries
//
// filter() handles comparison operators; i.e finding all Toss's currently in phases <= 2
// sort() handles sorting; i.e. arranging all Toss's in ascending phases - 0, 1, 2, 3, 4, 5
// limitFields() handles what properties are sent in the response; i.e. only send Toss 'prompt' property
// paginate() handles how many Documents are sent at a time; i.e only display 3 out of the 10 total Toss's
//
//
// ======================================= Description ============================================ //

class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'limit', 'fields', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    // "regular expression": /\b(gte|gt|lte|lt)\b/
    //// This replaces strings in queryStr that match those in the parentheses argument
    // 'g', following the regular expression, replaces all occurrences, and not just the first
    // .replace accepts a callback, which we call 'match', the callback returns the new string
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // produces string: "toSort toSort2 toSort3" which is needed for .sort
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    //else {
    // this.query = query.sort('-currentPhase');

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // produces string: "toLimit toLimit2 toLimit3" which is needed for .select
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // default, if no limiting-fields are given
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // starting page:
    const page = this.queryString.page * 1 || 1;
    // max number of Documents on a page:
    const limit = this.queryString.limit * 1 || 20;

    // ?page=2&limit=10 means that the client wants page 2, but there are 10 results per page,
    /// so we have to skip the first page; i.e. 10 results before we start querying
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
