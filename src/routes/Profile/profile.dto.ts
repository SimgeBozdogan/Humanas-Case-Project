import Joi from 'joi';

export type ProfileCreateDtoType = {
  name: string;
  headline: string;
  skills: string[];
  bio?: string;

}
export type ProfileType = {
  id: string;
  createdAt: string;
} & ProfileCreateDtoType;

export const ProfileCreateDto = Joi.object<ProfileCreateDtoType>({
  name: Joi.string().trim().min(1).required(),
  headline: Joi.string().trim().min(1).required(),
  skills: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),
  bio: Joi.string().trim().min(1).optional(),
});
