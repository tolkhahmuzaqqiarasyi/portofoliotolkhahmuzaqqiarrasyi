import type { Accent, RoleTag } from '../types/portfolio';

export const accentOptions: {value: Accent;label: string;}[] = [
{ value: 'primary', label: 'Biru elektrik' },
{ value: 'pink', label: 'Pink' },
{ value: 'lemon', label: 'Kuning lemon' },
{ value: 'violet', label: 'Ungu / lavender' }];


export const roleOptions: {value: RoleTag;label: string;}[] = [
{ value: 'UI/UX', label: 'UI/UX Designer' },
{ value: 'PM', label: 'Project Lead' },
{ value: 'Frontend', label: 'Frontend Developer' },
{ value: 'Marketing', label: 'Digital Marketing' }];