/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  // Find all published posts with SEO data
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        featuredImage: true,
        ogImage: true,
        seo: {
          populate: {
            metaImage: true,
          },
        },
      },
    }

    const { data, meta } = await super.find(ctx)
    return { data, meta }
  },

  // Find one published post by slug or id with SEO data
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        featuredImage: true,
        ogImage: true,
        seo: {
          populate: {
            metaImage: true,
          },
        },
      },
    }

    const { data, meta } = await super.findOne(ctx)
    return { data, meta }
  },
}))
