// export const providerUrl = 'https://jzngnl43-8545.inc1.devtunnels.ms/';
export const providerUrl = 'http://localhost:8545';

export const abi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressInQuestion",
				"type": "address"
			}
		],
		"name": "addAddressInContractors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressInQuestion",
				"type": "address"
			}
		],
		"name": "addAddressInType1",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressInQuestion",
				"type": "address"
			}
		],
		"name": "addAddressInType2",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			}
		],
		"name": "addBid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "approvalMap",
		"outputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "approvalDate",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_hashedMessage",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "_v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "_r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_s",
				"type": "bytes32"
			}
		],
		"name": "approveWorkOrder",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "contractorAddress",
				"type": "address"
			}
		],
		"name": "assignWorkOrderToContractor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "assignmentMap",
		"outputs": [
			{
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "assignmentDate",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "finalBid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorityMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "bidMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_hashedMessage",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "_v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "_r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_s",
				"type": "bytes32"
			}
		],
		"name": "closeWorkOrder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "closedMap",
		"outputs": [
			{
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "closingDate",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "completionMap",
		"outputs": [
			{
				"internalType": "address",
				"name": "contractor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "completionDate",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "maxBid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "createdAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "deadline",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "signerAuthority",
				"type": "uint256"
			}
		],
		"name": "createWorkOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "extendWorkOrderDeadline",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllWorkOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder[]",
				"name": "myWorkOrders",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWorkOrdersAssignedToContractor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder[]",
				"name": "myWorkOrders",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			}
		],
		"name": "getWorkOrdersById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder",
				"name": "myWorkOrder",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWorkOrdersCreatedBySender",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder[]",
				"name": "myWorkOrders",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWorkOrdersForAdminToApprove",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder[]",
				"name": "myWorkOrders",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWorkOrdersSenderApproved",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "maxBid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deadline",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "signerAuthority",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "extensionCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct TokenContract.WorkOrder[]",
				"name": "myWorkOrders",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "workOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "completionDate",
				"type": "string"
			}
		],
		"name": "markWorkOrderAsCompleteByContractor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "workOrderIds",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const contractAddress = '0x17aec2169c20ce108c34f352dacd7cf5518a3bba';