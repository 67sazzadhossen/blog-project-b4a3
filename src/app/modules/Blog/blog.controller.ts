import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successful',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.user, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BlogServices.deleteBlogFromDB(id, req.user);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successful',
    statusCode: httpStatus.OK,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
