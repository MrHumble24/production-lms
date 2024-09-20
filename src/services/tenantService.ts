// services/tenantService.ts
import { PrismaClient, Tenant } from "@prisma/client";
import deleteImageFromSupabase from "../helpers/removeImage";
import uploadImageToSupabase from "../helpers/uploadImage";
const prisma = new PrismaClient();

export const createTenant = async (
  data: Partial<Tenant>,
  file: any | undefined
): Promise<any> => {
  const {
    address = "",
    createdAt,
    description,
    email,
    id,
    isDeleted,
    name = "",
    phone,
    updatedAt,
    website,
  } = data;

  const logoUrl = await uploadImageToSupabase(file, "logo");

  // Prepare tenant data
  const tenantData = {
    address,
    createdAt,
    description,
    email,
    id,
    isDeleted,
    logo: logoUrl,
    name,
    phone,
    updatedAt,
    website,
  };

  const newTenant = await prisma.tenant.create({
    data: tenantData,
  });

  const mainBranch = await prisma.branch.create({
    data: {
      name: "Main Branch",
      tenantId: newTenant.id,
      address: address,
      description,
      phone,
      email,
      website,
    },
  });
  return { newTenant, mainBranch };
};

// Get all tenants
export const getAllTenants = async (): Promise<Tenant[]> => {
  return await prisma.tenant.findMany({
    include: {
      branches: true,
      socialMedia: true,
      CompanyOwner: true,
    },
  });
};

// Get a single tenant by ID
export const getTenantById = async (
  tenantId: number
): Promise<Tenant | null> => {
  return await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: {
      branches: true,
      socialMedia: true,
      CompanyOwner: true,
    },
  });
};

// Update a tenant
export const updateTenant = async (
  tenantId: number,
  data: Partial<Tenant>
): Promise<Tenant | null> => {
  return await prisma.tenant.update({
    where: { id: tenantId },
    data,
  });
};

export const updateTenantLogoService = async (
  tenantId: number,
  data: any | undefined
): Promise<Tenant | null> => {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { logo: true },
  });

  if (tenant?.logo) {
    await deleteImageFromSupabase(tenant?.logo);
  }
  const newLogo = await uploadImageToSupabase(data, "logo");

  return await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      logo: newLogo,
    },
  });
};

// Delete a tenant
export const deleteTenant = async (tenantId: number): Promise<void> => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { logo: true },
    });

    if (tenant && tenant.logo) {
      await deleteImageFromSupabase(tenant.logo);
    }

    await prisma.tenant.delete({
      where: { id: tenantId },
    });

    console.log(
      `Tenant with ID ${tenantId} and associated image deleted successfully.`
    );
  } catch (error) {
    console.error(`Failed to delete tenant: `, error);
    throw new Error(`Failed to delete tenant: ${error}`);
  }
};
