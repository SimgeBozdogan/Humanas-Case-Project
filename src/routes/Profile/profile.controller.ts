import type { RequestHandler } from 'express';
import { ProfileService } from './profile.service';
import {
  validateCreateProfile,
  getProfilePage,
  getNotFoundPage,
} from './profile.helper';

const create: RequestHandler = async (req, res) => {
  const dto = validateCreateProfile(req.body);
  const profile = await ProfileService.create(dto);
  const shareUrl = `${req.protocol}://${req.get('host')}/profiles/${profile.id}?type=html`;
  const body = { id: profile.id, shareUrl, profile };
  res.status(201).json(body);
};

const get: RequestHandler = async (req, res) => {
  const type = req.query.type === 'html' ? 'html' : 'json';
  const profile = await ProfileService.getById(req.params.id);

  if (!profile) {
    if (type === 'html') {
      res.status(404).type('html').send(getNotFoundPage(req.params.id));
    } else {
      res.status(404).json({ error: `No profile found for id "${req.params.id}".` });
    }
    return;
  }

  if (type === 'html') {
    res.type('html').send(getProfilePage(profile));
  } else {
    res.json(profile);
  }
};

export const ProfileController = {
  create,
  get,
};