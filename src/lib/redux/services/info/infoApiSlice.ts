import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/lib/types/ApiResponse";
import {IPersonalInfo} from "@/db/scheme/personalInfo";

export const infoApiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {baseUrl: "/api/info"}),
    reducerPath: "infoApi",
    tagTypes: ["Infos"],
    endpoints: (build) => ({
        getInfo: build.query<IPersonalInfo, void>({
            query: () => ``,
            transformResponse(baseQueryReturnValue: ApiResponse<IPersonalInfo>) {
                return baseQueryReturnValue.data
            },
            providesTags: () => [{type: "Infos"}],
        }),
    }),
});

export const {useGetInfoQuery} = infoApiSlice;
