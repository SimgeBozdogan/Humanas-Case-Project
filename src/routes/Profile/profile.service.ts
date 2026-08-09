import { fileURLToPath } from 'node:url';
import { StoreService } from '../../services';
import { generateId } from '../../shared/utils';
import { type ProfileCreateDtoType, type ProfileType } from './profile.dto';
import { dedupeSkills } from './profile.helper';
const DATA_FILE =
  process.env.PROFILE_DATA_FILE ??
  fileURLToPath(new URL('../../../data/profiles.json', import.meta.url));

const store = new StoreService<ProfileType>(DATA_FILE);
function contentKey(name: string, headline: string, skills: string[], bio?: string): string {
  return JSON.stringify({
    name: name.trim().toLowerCase(),
    headline: headline.trim().toLowerCase(),
    skills: [...skills].map((s) => s.trim().toLowerCase()).sort(),
    bio: (bio ?? '').trim().toLowerCase(),
  });
}
const create = async (dto: ProfileCreateDtoType) => {
  const skills = dedupeSkills(dto.skills);
  const key = contentKey(dto.name, dto.headline, skills, dto.bio);

  const existing = await store.findBy(
    (p) => contentKey(p.name, p.headline, p.skills, p.bio) === key
  );
  if (existing) return existing;

  const profile = {
    id: generateId(),
    name: dto.name,
    headline: dto.headline,
    skills,
    createdAt: new Date().toISOString(),
    ...(dto.bio ? { bio: dto.bio } : {}),
  };

  return store.save(profile);
};

const getById = async (id: string) => {
  return store.get(id);
};

export const ProfileService = {
  create,
  getById,
};