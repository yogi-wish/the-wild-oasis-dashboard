import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from 'react'
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers';
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { image, maxCapacity, regularPrice, discount, name, id: cabinId } = cabin;

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success('the cabin deleted sucessfully')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={()=>setShowForm(!showForm)}>Edit</button>
          <button disabled={isLoading} onClick={() => mutate(cabinId)}>Delete</button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  )
}

export default CabinRow
