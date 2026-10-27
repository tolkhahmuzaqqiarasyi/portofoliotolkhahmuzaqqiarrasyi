import {
  BarChart3Icon,
  BriefcaseIcon,
  CalendarRangeIcon,
  CameraIcon,
  Code2Icon,
  GlobeIcon,
  LayoutTemplateIcon,
  MailIcon,
  MegaphoneIcon,
  MessageCircleIcon,
  PenLineIcon,
  PenToolIcon,
  SparklesIcon,
  type LucideIcon } from
'lucide-react';
import type { IconKey } from '../types/portfolio';

export const iconMap: Record<IconKey, LucideIcon> = {
  'pen-tool': PenToolIcon,
  code: Code2Icon,
  calendar: CalendarRangeIcon,
  sparkles: SparklesIcon,
  layout: LayoutTemplateIcon,
  'pen-line': PenLineIcon,
  chart: BarChart3Icon,
  megaphone: MegaphoneIcon,
  mail: MailIcon,
  whatsapp: MessageCircleIcon,
  linkedin: BriefcaseIcon,
  instagram: CameraIcon,
  globe: GlobeIcon
};

export const iconOptions: {value: IconKey;label: string;}[] = [
{ value: 'pen-tool', label: 'Desain (pena)' },
{ value: 'code', label: 'Kode' },
{ value: 'calendar', label: 'Kalender' },
{ value: 'sparkles', label: 'Kilau' },
{ value: 'layout', label: 'Layout' },
{ value: 'pen-line', label: 'Tulisan' },
{ value: 'chart', label: 'Grafik' },
{ value: 'megaphone', label: 'Megafon' },
{ value: 'mail', label: 'Email' },
{ value: 'whatsapp', label: 'WhatsApp / Chat' },
{ value: 'linkedin', label: 'LinkedIn (koper)' },
{ value: 'instagram', label: 'Instagram (kamera)' },
{ value: 'globe', label: 'Website' }];