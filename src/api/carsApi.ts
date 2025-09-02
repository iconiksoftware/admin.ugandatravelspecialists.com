import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiResponse } from '../lib/types';
import apiClient from '../lib/apiClient';

export const TransmissionTypes = ['manual', 'automatic'] as const;

export type TransmissionType = (typeof TransmissionTypes)[number];

export const FuelTypes = ['diesel', 'diesel hybrid', 'petrol', 'petrol hybrid', 'electricity'] as const;

export type FuelType = (typeof FuelTypes)[number];

export const DriveTypes = ['2wd', '4wd'] as const;

export type DriveType = (typeof DriveTypes)[number];

export interface Car {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerDayUsd: number;
  pricePerDayUgx: number;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  seats: number;
  drive: DriveType;
  selfDriveAvailable: boolean;
  primaryPhotoUrl: string;
  photos: string[];
}

export const carsQueryKey = 'carsQueryKey';

export const useCars = () => {
  return useQuery({
    queryKey: [carsQueryKey],
    queryFn: async () => {
      const apiResponse = (await apiClient.get<ApiResponse<Car[]>>('/cars')).data;
      const cars = apiResponse.payload;
      return cars;
    },
    initialData: [],
    refetchInterval: 10000,
  });
};

interface CreateCarMutationData {
  name: string;
  description: string;
  pricePerDayUsd: number;
  pricePerDayUgx: number;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  seats: number;
  drive: DriveType;
  selfDriveAvailable: boolean;
  photo: File;
}

export const useCreateCarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCarMutationData) => {
      const formData = new FormData();

      formData.append('name', payload.name);
      formData.append('description', payload.description);
      formData.append('transmissionType', payload.transmissionType);
      formData.append('fuelType', payload.fuelType);
      formData.append('seats', payload.seats.toString());
      formData.append('pricePerDayUsd', payload.pricePerDayUsd.toString());
      formData.append('pricePerDayUgx', payload.pricePerDayUgx.toString());
      formData.append('drive', payload.drive);
      formData.append('selfDriveAvailable', String(payload.selfDriveAvailable));
      formData.append('photo', payload.photo);

      const apiResponse = (
        await apiClient.post<ApiResponse<Car>>('/cars', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      return apiResponse;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [carsQueryKey] });
    },
  });
};
