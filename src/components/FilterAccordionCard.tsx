import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Card, CardContent } from './ui/card';
import { FilterX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterAccordionCardProps {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
  headerClassName?: string;
  showClearAll?: boolean;
  isCollapsible?: boolean;
  onClearAll?: () => void;
}
export default function FilterAccordionCard({
  children,
  actions,
  style,
  headerClassName,
  showClearAll,
  onClearAll,
  isCollapsible = true,
}: FilterAccordionCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full">
      <CardContent className="py-0">
        <Accordion
          type="single"
          defaultValue="filter"
          collapsible={isCollapsible}
        >
          <AccordionItem value="filter">
            <div
              className={cn(
                'flex justify-between items-center border-b',
                headerClassName,
              )}
            >
              {showClearAll ? (
                <div className="gap-2 flex flex-1 w-full items-center py-4 font-medium">
                  <span>{t('label.filters')}</span>
                  <button
                    onClick={onClearAll}
                    className="text-red-500 hover:text-red-700"
                    title={t('label.clearAllFilters')}
                  >
                    <FilterX size={20} />
                  </button>
                </div>
              ) : (
                <AccordionTrigger>{t('label.filters')}</AccordionTrigger>
              )}
              {actions}
            </div>
            <AccordionContent className={cn('pt-3')} style={style}>
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
