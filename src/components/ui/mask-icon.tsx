const cleaning = '/images/icons/cleaning.svg';
const contacts = '/images/icons/contacts.svg';
const contracts = '/images/icons/contracts.svg';
const documents = '/images/icons/documents.svg';
const employees = '/images/icons/employees.svg';
const equipments = '/images/icons/equipments.svg';
const home = '/images/icons/home.svg';
const inspections = '/images/icons/inspections.svg';
const inventory = '/images/icons/inventory.svg';
const invoices = '/images/icons/invoices.svg';
const locations = '/images/icons/locations.svg';
const maintenances = '/images/icons/maintenances.svg';
const nightRegistration = '/images/icons/night-registration.svg';
const planning = '/images/icons/planning.svg';
const reports = '/images/icons/reports.svg';
const inventoryOrangeInfo = '/images/icons/inventory/fa-orange-info.svg';
const inventoryRedInfo = '/images/icons/inventory/fa-red-info.svg';
const intentoryBrokenGlass = '/images/icons/inventory/broken-glass.svg';
const inventoryReorder = '/images/icons/inventory/reorder.svg';

import { cn } from '@/lib/utils';

export type MaskIconName =
  | 'home'
  | 'inspections'
  | 'maintenances'
  | 'cleaning'
  | 'locations'
  | 'contacts'
  | 'employees'
  | 'contracts'
  | 'invoices'
  | 'reports'
  | 'documents'
  | 'planning'
  | 'equipments'
  | 'inventory'
  | 'night-registration'
  | 'inventory-orange-info'
  | 'inventory-red-info'
  | 'intentory-broken-glass'
  | 'inventory-reorder';

const icons: Record<MaskIconName, string> = {
  home,
  inspections,
  maintenances,
  cleaning,
  locations,
  contacts,
  employees,
  contracts,
  invoices,
  reports,
  documents,
  planning,
  equipments,
  inventory,
  'night-registration': nightRegistration,
  'inventory-orange-info': inventoryOrangeInfo,
  'inventory-red-info': inventoryRedInfo,
  'intentory-broken-glass': intentoryBrokenGlass,
  'inventory-reorder': inventoryReorder,
};

interface MaskIconProps {
  name: MaskIconName;
  size?: number;
  color?: string;
  className?: string;
}

const MaskIcon: React.FC<MaskIconProps> = ({
  name,
  size,
  color = 'bg-current',
  className = '',
  ...props
}) => {
  const iconUrl = icons[name];

  return (
    <div
      className={cn('mask-ico', className, color)}
      style={{
        ...(size && { width: size, height: size }),
        maskImage: `url(${iconUrl})`,
        WebkitMaskImage: `url(${iconUrl})`,
        maskSize: 'cover',
        WebkitMaskSize: 'cover',
      }}
      {...props}
    />
  );
};

export default MaskIcon;
