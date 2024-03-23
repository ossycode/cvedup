import { RootState } from "@/lib/store";
import { CvData } from "@/utils/validation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cvSlice = createSlice({
  name: "cv",
  initialState: {} as CvData,
  reducers: {
    setPersonalInformation: (
      state,
      action: PayloadAction<CvData["personalInformation"]>
    ) => {
      state.personalInformation = action.payload;
    },
    addEducation: (state, action: PayloadAction<CvData["education"][0]>) => {
      state.education = [...(state.education || []), action.payload];
    },
    addWorkExperience: (
      state,
      action: PayloadAction<CvData["workExperience"][0]>
    ) => {
      state.workExperience = [...(state.workExperience || []), action.payload];
    },
    addReference: (state, action: PayloadAction<CvData["references"][0]>) => {
      state.references = [...(state.references || []), action.payload];
    },
    setPhoto: (state, action: PayloadAction<CvData["photo"]>) => {
      state.photo = action.payload;
    },
    setLanguage: (state, action: PayloadAction<CvData["language"]>) => {
      state.language = action.payload;
    },
    setSummary: (state, action: PayloadAction<CvData["summary"]>) => {
      state.summary = action.payload;
    },
  },
});

export const {
  setPersonalInformation,
  addEducation,
  addWorkExperience,
  addReference,
  setPhoto,
  setLanguage,
  setSummary,
} = cvSlice.actions;

export default cvSlice.reducer;
export const selectCv = (state: RootState) => state.cv;
