import { escapeHtml } from '../../shared/utils';
import { ErrorService } from '../../services';
import {
    ProfileCreateDto,
    type ProfileCreateDtoType,
    type ProfileType,
} from './profile.dto';


export function validateCreateProfile(input: unknown): ProfileCreateDtoType {
    const { error, value } = ProfileCreateDto.validate(input, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
    });

    if (error) {
        const details = error.details.map((d) => d.message);
        throw new ErrorService(400, 'Invalid profile', details);
    }

    return value as ProfileCreateDtoType;
}

export function getProfilePage(p: ProfileType): string {
    const skills = p.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('');
    const bio = p.bio ? `<p class="bio">${escapeHtml(p.bio)}</p>` : '';
    return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(p.name)} — profile</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 40rem;
         margin: 4rem auto; padding: 0 1rem; color: #1a1a1a; }
  h1 { margin-bottom: .25rem; }
  .headline { color: #555; font-size: 1.1rem; margin-top: 0; }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em;
       color: #888; margin-top: 2rem; }
  ul { padding-left: 0; list-style: none; display: flex; flex-wrap: wrap; gap: .5rem; }
  li { background: #f0f0f0; border-radius: 999px; padding: .3rem .8rem; font-size: .9rem; }
  .bio { margin-top: 1.5rem; line-height: 1.55; }
  .meta { margin-top: 2.5rem; color: #aaa; font-size: .8rem; }
</style>
<h1>${escapeHtml(p.name)}</h1>
<p class="headline">${escapeHtml(p.headline)}</p>
<h2>Skills</h2>
<ul>${skills}</ul>
${bio}
<p class="meta">Profile ${escapeHtml(p.id)} · created ${escapeHtml(p.createdAt)}</p>
</html>`;
}

export function getNotFoundPage(id: string): string {
    return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Profile not found</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 40rem;
         margin: 4rem auto; padding: 0 1rem; color: #1a1a1a; }
  code { background: #f0f0f0; padding: .1rem .3rem; border-radius: 4px; }
</style>
<h1>Profile not found</h1>
<p>No profile matches the id <code>${escapeHtml(id)}</code>. It may have been
mistyped, or the link may be out of date.</p>
</html>`;
}

export function dedupeSkills(skills: string[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const skill of skills) {
        const key = skill.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(skill);
    }
    return out;
}