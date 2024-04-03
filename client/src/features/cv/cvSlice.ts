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
    deleteEducation: (state, action: PayloadAction<number>) => {
      state.education = state.education.filter(
        (_, index: number) => index !== action.payload
      );
    },
    addWorkExperience: (
      state,
      action: PayloadAction<CvData["workExperience"][0]>
    ) => {
      state.workExperience = [...(state.workExperience || []), action.payload];
    },

    deleteWorkExperience: (state, action: PayloadAction<number>) => {
      state.workExperience = state.workExperience.filter(
        (_, index: number) => index !== action.payload
      );
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

    addSkill: (state, action: PayloadAction<CvData["skills"]>) => {
      state.skills = state.skills = action.payload;
    },
    removeSkill: (state, action: PayloadAction<CvData["skills"][0]>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },
    AddCertification: (
      state,
      action: PayloadAction<CvData["certifications"][0]>
    ) => {
      state.certifications = [...(state.certifications || []), action.payload];
    },
    deleteCertification: (state, action: PayloadAction<number>) => {
      state.certifications = state.certifications.filter(
        (_, index: number) => index !== action.payload
      );
    },
  },
});

export const {
  setPersonalInformation,
  addEducation,
  deleteEducation,
  addWorkExperience,
  deleteWorkExperience,
  addReference,
  addSkill,
  removeSkill,
  setPhoto,
  setLanguage,
  setSummary,
  AddCertification,
  deleteCertification,
} = cvSlice.actions;

export default cvSlice.reducer;
export const selectCv = (state: RootState) => state.cv;
