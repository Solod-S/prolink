import { createAsyncThunk } from "@reduxjs/toolkit";
import * as MyPostApi from "../../service/API/MyPostAPI";
import * as MediaFilesApi from "../../service/API/MediaFilesAPI ";
import * as CloudinaryApi from "../../service/API/CloudinaryAPI";
import { toast } from "react-toastify";

export const fetchMyPosts = createAsyncThunk("own-posts/", async (_, thunkAPI) => {
  try {
    const data = await MyPostApi.fetchMyPosts();
    return data;
  } catch (error) {
    toast.error(`Oops something went wrong, please try again later`);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteMyPost = createAsyncThunk("own-posts/remove/id", async (id, thunkAPI) => {
  try {
    await MyPostApi.deleteMyPost(id);
    toast.success(`Your post was successfully deleted`);
    return id;
  } catch (error) {
    toast.error(`Oops something went wrong, please try again later`);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateMyPost = createAsyncThunk("own-posts/update/id", async (body, thunkAPI) => {
  try {
    const data = await MyPostApi.updateMyPost(body);
    toast.success(`Your post was successfully updated`);
    return data;
  } catch (error) {
    toast.error(`Oops something went wrong, please try again later`);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createMyPost = createAsyncThunk("own-posts/add", async (body, thunkAPI) => {
  try {
    const { mediaFile, mediaFileType, description, location } = body;
    if (mediaFile) {
      if (mediaFileType === "img") {
        const postData = await MyPostApi.createMyPost({ description });
        const cloudinaryData = await CloudinaryApi.uploadFileToCloudinary(mediaFile);
        const mediaFIleData = await MediaFilesApi.createMediaFile({
          type: mediaFileType,
          location,
          url: cloudinaryData.secure_url,
          providerPublicId: cloudinaryData.public_id,
          postId: postData.data.post._id,
        });
        console.log(cloudinaryData);
        postData.data.post.mediaFiles.push(mediaFIleData.data.mediaFile);
        toast.success(`Your post was successfully created`);
        return postData;
      }
      if (mediaFileType === "video") {
        const postData = await MyPostApi.createMyPost({ description });
        const mediaFIleData = await MediaFilesApi.createMediaFile({
          type: mediaFileType,
          location,
          url: mediaFile,
          providerPublicId: "youtube",
          postId: postData.data.post._id,
        });
        postData.data.post.mediaFiles.push(mediaFIleData.data.mediaFile);
        toast.success(`Your post was successfully created`);
        return postData;
      }
    } else {
      const { description } = body;

      const data = await MyPostApi.createMyPost({ description });
      toast.success(`Your post was successfully created`);
      return data;
    }
  } catch (error) {
    toast.error(`Oops something went wrong, please try again later`);
    return thunkAPI.rejectWithValue(error.message);
  }
});
