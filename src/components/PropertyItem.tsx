import Image from 'next/image';

import styles from '../styles/components/PropertyItem.module.scss';

export type Property = {
  id: number;
  image: string;
  type_property: string;
  city: string;
  state: string;
  neighborhood: string;
  price: number;
  dependencies: string;
}

type PropertyItemProps = {
  property: Property;
}

export function PropertyItem({ property }: PropertyItemProps) {
  return (
    <div className={styles.propertyItemContainer}>
      <Image 
        src={property.image}
        width={250}
        height={250}
        objectFit="cover"
      />

      <div className={styles.propertyInfo}>
        <strong>{property.type_property}</strong>
        <span>
          {property.neighborhood} de {property.city} - {property.state}
        </span>
        <strong className={styles.price}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(property.price)}
        </strong>
        <p>{property.dependencies}</p>
      </div>
    </div>
  );
}