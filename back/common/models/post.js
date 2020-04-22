'use strict';

module.exports = function(Post) {
    Post.validatesInclusionOf('type', { in: ['news', 'slider'], message: 'invalidType' });
};