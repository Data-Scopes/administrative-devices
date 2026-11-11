// The three layers of archival organisation (proposal section 7a) and the objective that addresses each.
// Colours and icons come from archival-structures/design/identity-exploration (notes.md, "Three-layer icon set").
import information from '../assets/icons/layer-1-information-structure.svg?url';
import administrative from '../assets/icons/layer-2-administrative-structure.svg?url';
import archival from '../assets/icons/layer-3-archival-structure.svg?url';

export type LayerId = 'information' | 'administrative' | 'archival';

export interface Layer {
  id: LayerId;
  name: string;
  colour: string;
  icon: string;
  where: string;
  description: string;
  objective: string;
  objectiveText: string;
}

export const layers: Layer[] = [
  {
    id: 'information',
    name: 'Information structure',
    colour: 'var(--layer-information)',
    icon: information,
    where: 'within documents',
    description:
      'The structure inside a document: tables, forms with standard fields, lists, headers, marginalia, and the fixed formats of each document type.',
    objective: 'Document-level structure extraction',
    objectiveText:
      'Recognise document types and their parts, text that continues across columns, pages and scans, and the formulaic language that marks structure.',
  },
  {
    id: 'administrative',
    name: 'Administrative structure',
    colour: 'var(--layer-administrative)',
    icon: administrative,
    where: 'across documents',
    description:
      'How the people who made the records organised their work: indexes, cross-references in the margins, and filing systems that group documents by origin or purpose.',
    objective: 'Cross-document structure recognition',
    objectiveText:
      'Find how documents group into larger units (sections, dossiers, meeting sessions), how those units are ordered, and where they begin and end.',
  },
  {
    id: 'archival',
    name: 'Archival structure',
    colour: 'var(--layer-archival)',
    icon: archival,
    where: 'of the collection',
    description:
      'How archivists described and arranged the collection: finding aids, inventories, series descriptions and card catalogues.',
    objective: 'Hierarchical integration',
    objectiveText:
      'Link structure found on the page to the finding aids and inventories (EAD), and produce datasets that work at every level of the hierarchy.',
  },
];

export const layerById = Object.fromEntries(layers.map((l) => [l.id, l])) as Record<LayerId, Layer>;
