/**
 * Utility function to paginate and sort results from the database.
 * @param {Object} model - Mongoose model to query.
 * @param {Object} query - Filters and conditions for querying the model.
 * @param {Object} options - Additional options for pagination and sorting.
 * @returns {Object} - Paginated results including total count and data.
 */
const paginateAndSort = async (model, query = {}, options = {}) => {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const sortBy = options.sort || 'name';  // Default sorting by name

    try {
        const total = await model.countDocuments(query);  // Get total number of documents
        const results = await model.find(query)
            .sort(sortBy)            // Apply sorting
            .skip((page - 1) * limit) // Skip to the correct page
            .limit(limit);            // Limit the number of results per page

        return {
            total,                    // Total number of documents
            currentPage: page,        // Current page
            totalPages: Math.ceil(total / limit),  // Total pages available
            data: results             // Paginated results
        };
    } catch (error) {
        throw new Error('Pagination error: ' + error.message);
    }
};

module.exports = paginateAndSort;
